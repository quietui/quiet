import '../bytes/bytes.js';
import '../icon/icon.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Localize } from '../../utilities/localize.js';
import { QuietBlurEvent, QuietChangeEvent, QuietFocusEvent, QuietInputEvent } from '../../events/form.js';
import { QuietElement } from '../../utilities/quiet-element.js';
import formControlStyles from '../../styles/form-control.styles.js';
import hostStyles from '../../styles/host.styles.js';
import styles from './file-input.styles.js';
import type { CSSResultGroup } from 'lit';

// Borrow the native file input's validation message
const nativeFileInput = document.createElement('input');
nativeFileInput.name = 'quiet-faux-input';
nativeFileInput.type = 'file';
nativeFileInput.required = true;
const VALIDATION_MESSAGE = nativeFileInput.validationMessage;

/**
 * <quiet-file-input>
 *
 * @summary File inputs let the user select files to upload to the server.
 * @documentation https://quietui.com/docs/components/file
 * @status stable
 * @since 1.0
 *
 * @dependency quiet-bytes
 * @dependency quiet-icon
 *
 * @slot label - The file input's label. For plain-text labels, you can use the `label` attribute instead.
 * @slot description - The file input's description. For plain-text descriptions, you can use the `description`
 *  attribute instead.
 * @slot dropzone - Custom content to show in the dropzone.
 *
 * @event quiet-blur - Emitted when the file input loses focus. This event does not bubble.
 * @event quiet-change - Emitted when the user selects or removes a file.
 * @event quiet-focus - Emitted when the file input receives focus. This event does not bubble.
 * @event quiet-input - Emitted when the file input receives input.
 *
 * @cssstate disabled - Applied when the file input is disabled.
 * @cssstate empty - Applied when the file input is empty.
 * @cssstate focused - Applied when the file input has focus.
 * @cssstate user-valid - Applied when the file input is valid and the user has sufficiently interacted with it.
 * @cssstate user-invalid - Applied when the file input is invalid and the user has sufficiently interacted with it.
 *
 * @csspart label - The element that contains the text field's label, a `<label>` element.
 * @csspart description - The element that contains the text field's description.
 * @csspart dropzone - The bordered region where files can be dropped.
 * @csspart file-list - The list of files shown when at least one file is selected.
 * @csspart file - A selected file will be drawn in this container.
 * @csspart file-thumbnail - The container that hold's the file's image or icon.
 * @csspart file-image - The file's image preview (if it's an image).
 * @csspart file-icon - The file's icon (if it's not an image).
 * @csspart file-icon__svg - The `<svg>` part of the file icon.
 * @csspart file-details - The container that holds the filename and size.
 * @csspart file-name - The container that holds the file's name, a `<span>` element.
 * @csspart file-size - The container that holds the file's size, a `<small>` element.
 * @csspart file-actions - The container that holds the file's remove button.
 * @csspart file-remove-button - The file's remove button.
 * @csspart file-remove-button__button - The `button` part of the file's remove button.
 */
@customElement('quiet-file-input')
export class QuietFileInput extends QuietElement {
  static formAssociated = true;
  static styles: CSSResultGroup = [hostStyles, formControlStyles, styles];

  /** A reference to the `<form>` associated with the form control, or `null` if no form is associated. */
  public associatedForm: HTMLFormElement | null = null;
  private localize = new Localize(this);

  @query('#dropzone') dropzone: HTMLLabelElement;
  @query('#file-input') fileInput: HTMLInputElement;

  @state() private isDragging = false;
  @state() private isInvalid = false;
  @state() private wasChanged = false;
  @state() private wasSubmitted = false;

  /** An array of files that are currently selected. (Property only)*/
  @state() public files: File[] = [];

  /**
   * The text field's label. If you need to provide HTML in the label, use the `label` slot instead.
   */
  @property() label: string;

  /**
   * The text field's description. If you need to provide HTML in the description, use the `description` slot instead.
   */
  @property() description: string;

  /** The name of the file input. This will be submitted with the form as a name/value pair. */
  @property({ reflect: true }) name: string;

  /** Disables the file input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * A list of acceptable file types. Must be a comma-separated list of [unique file type
   * specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers).
   */
  @property() accept = false;

  /** Allows more than one file to be selected. */
  @property({ type: Boolean }) multiple = false;

  /** The file input's size. */
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Makes the file input required. Form submission will not be allowed when this is set and no files are selected.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * You can provide a custom error message to force the text field to be invalid. To clear the error, set this to an
   * empty string.
   */
  @property({ attribute: 'custom-validity' }) customValidity = '';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('invalid', this.handleHostInvalid);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.handleHostInvalid);
  }

  updated(changedProps: Map<string, unknown>) {
    // Always be updating
    this.updateValidity();

    // Handle value
    if (changedProps.has('files')) {
      this.customStates.set('empty', this.files.length === 0);
      // Update the file list so assistive devices read the correct number of files
      this.fileInput.files = this.getFileList();

      // Safari's accessibility tree doesn't seem to update when the files property is set, but toggling an aria-
      // attribute seems to do the trick. Without it, VoiceOver won't announce the updated file list.
      this.fileInput.setAttribute('aria-hidden', 'true');
      this.fileInput.removeAttribute('aria-hidden');

      this.updateFormValue();
    }

    // Handle disabled
    if (changedProps.has('disabled')) {
      this.customStates.set('disabled', this.disabled);
    }

    // Handle user interactions. When the form control's value has changed and lost focus (e.g. change event), we can
    // show user-valid and user-invalid states. We also show it if the form has been submitted.
    if (this.wasChanged || this.wasSubmitted) {
      this.customStates.set('user-invalid', this.isInvalid);
      this.customStates.set('user-valid', !this.isInvalid);
    } else {
      this.customStates.set('user-invalid', false);
      this.customStates.set('user-valid', false);
    }
  }

  /** @internal Called when the associated form element changes. */
  formAssociatedCallback(form: HTMLFormElement | null) {
    this.associatedForm = form;
  }

  /** @internal Called when a containing fieldset is disabled. */
  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /** @internal Called when the form is reset. */
  formResetCallback() {
    this.isInvalid = false;
    this.wasChanged = false;
    this.wasSubmitted = false;
    this.files = [];
  }

  /** Converts the `this.files` array into a `FileList` object so the `<input type="file">` can be updated. */
  private getFileList() {
    const dt = new DataTransfer();
    for (const file of this.files) dt.items.add(file);
    return dt.files;
  }

  private handleBlur() {
    this.customStates.set('focused', false);
    this.dispatchEvent(new QuietBlurEvent());
  }

  private handleDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  private handleDragLeave(event: DragEvent) {
    if (event.relatedTarget === this.dropzone) {
      event.stopPropagation();
      event.preventDefault();
    }

    event.preventDefault();
    this.isDragging = false;
  }

  private handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'copy';
  }

  private handleDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    this.wasChanged = true;

    if (this.multiple) {
      this.files = this.files.concat([...event.dataTransfer!.files]);
    } else {
      this.files = [event.dataTransfer!.files[0]];
    }

    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new QuietChangeEvent());
  }

  private handleFileInput() {
    this.wasChanged = true;

    // Append selected files
    if (this.fileInput.files) {
      if (this.multiple) {
        this.files = this.files.concat([...this.fileInput.files]);
      } else {
        this.files = [this.fileInput.files[0]];
      }
    }

    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new QuietChangeEvent());
  }

  private handleFocus() {
    this.customStates.set('focused', true);
    this.dispatchEvent(new QuietFocusEvent());
  }

  private handleHostInvalid() {
    //
    // We need to simulate the :user-invalid state when the form is submitted. Alas, there's no way to listen to form
    // submit because validation occurs before the `formdata` and `submit` events. The only way I've found to hook into
    // it is by listening to the `invalid` event on the host element, which is dispatched by the browser when the form
    // is submitted and the form-associated custom element is invalid.
    //
    this.wasSubmitted = true;
  }

  private handleRemoveClick(_: MouseEvent, indexToRemove: number) {
    this.files = this.files.filter((__, index) => index !== indexToRemove);
    this.dispatchEvent(new QuietInputEvent());
    this.dispatchEvent(new QuietChangeEvent());
  }

  /** Determines if a File object is an image type the browser can render. */
  private isImage(file: File) {
    return ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'].includes(
      file.type
    );
  }

  /** Returns a system icon name based on the provided mime type. */
  private mimeTypeToIconName(mimeType: string) {
    // Archives
    if (
      [
        'application/x-freearc', // cspell:disable-line
        'application/x-bzip',
        'application/x-bzip2',
        'application/gzip',
        'application/java-archive',
        'application/vnd.rar',
        'application/x-tar',
        'application/zip',
        'application/x-zip-compressed',
        'application/x-7z-compressed'
      ].includes(mimeType)
    ) {
      return 'file-zip';
    }

    // Audio
    if (mimeType.startsWith('audio')) {
      return 'music';
    }

    // Images
    if (mimeType.startsWith('image')) {
      return 'photo';
    }

    // Video
    if (mimeType.startsWith('video')) {
      return 'video';
    }

    return 'file';
  }

  /** Updates the form value based on this.files. Call this after adding or removing files to/from this.files. */
  private updateFormValue() {
    const formData = new FormData();
    this.files.forEach(file => formData.append(this.name, file));
    this.internals.setFormValue(formData);
  }

  /** Sets the form control's validity */
  private async updateValidity() {
    await this.updateComplete;
    const hasCustomValidity = this.customValidity?.length > 0;
    const hasMissingValue = this.required && this.files.length === 0;
    const validationMessage = hasCustomValidity ? this.customValidity : VALIDATION_MESSAGE;
    const flags: ValidityStateFlags = {
      customError: hasCustomValidity,
      valueMissing: hasMissingValue
    };
    this.isInvalid = hasCustomValidity ? true : hasMissingValue;
    this.internals.setValidity(flags, validationMessage, this.fileInput);
  }

  render() {
    return html`
      <label id="label" part="label" for="file-input">
        <slot name="label">${this.label}</slot>
      </label>

      <div id="description" part="description">
        <slot name="description">${this.description}</slot>
      </div>

      <label
        id="dropzone"
        part="dropzone"
        class="${classMap({
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // States
          disabled: this.disabled,
          dragging: this.isDragging
        })}"
        role="presentation"
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @dragenter=${this.handleDragEnter}
        @dragleave=${this.handleDragLeave}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        <slot name="dropzone">
          <quiet-icon library="system" name="upload"></quiet-icon>
          <br />
          ${this.localize.term('browseForFilesOrDragAndDrop')}
        </slot>

        <input
          id="file-input"
          type="file"
          accept=${ifDefined(this.accept)}
          ?multiple=${ifDefined(this.multiple)}
          ?required=${ifDefined(this.required)}
          aria-describedby="description"
          @input=${this.handleFileInput}
        />
      </label>

      <div
        part="file-list"
        id="file-list"
        class="${classMap({
          // Sizes
          xs: this.size === 'xs',
          sm: this.size === 'sm',
          md: this.size === 'md',
          lg: this.size === 'lg',
          xl: this.size === 'xl',
          // States
          disabled: this.disabled,
          dragging: this.isDragging
        })}"
      >
        ${this.files.map((file, index) => {
          const isImage = this.isImage(file);
          const iconName = this.mimeTypeToIconName(file.type);

          return html`
            <div part="file" class="file">
              <span part="file-thumbnail" class="file-thumbnail">
                ${isImage
                  ? html`<img part="file-image" src=${URL.createObjectURL(file)} alt="" aria-hidden="true" />`
                  : html`
                      <quiet-icon
                        part="file-icon"
                        exportparts="svg:file-icon__svg"
                        library="system"
                        name="${iconName}"
                      ></quiet-icon>
                    `}
              </span>
              <div class="file-details">
                <span class="file-name">${file.name}</span>
                <small class="file-size">
                  <quiet-bytes value=${file.size} lang=${this.localize.lang()}></quiet-bytes>
                </small>
              </div>
              <div class="file-actions">
                <quiet-button
                  part="file-remove-button"
                  exportparts="button:file-remove-button__button"
                  class="file-remove"
                  name="x"
                  appearance="text"
                  icon-label=${this.localize.term('remove')}
                  size=${this.size}
                  @click=${(event: MouseEvent) => this.handleRemoveClick(event, index)}
                >
                  <quiet-icon library="system" name="x"></quiet-icon>
                </quiet-button>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

// Prevent accidental drops from navigating to another page
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('dragleave', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

declare global {
  interface HTMLElementTagNameMap {
    'quiet-file-input': QuietFileInput;
  }
}
