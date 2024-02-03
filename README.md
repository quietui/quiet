# Quiet UI

![Quiet UI logo](https://pbs.twimg.com/profile_banners/1705198841094356992/1697645956/1500x500)

Quiet is a hand-crafted UI library built with [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). It uses standardized browser APIs, so its components are highly portable and interoperable. That means you can use them with just about any JavaScript framework — or even without one!

Since Quiet is built with Web Standards, it's not tied to the lifespan of any framework. Learn it once, use it forever. Quiet has an accessibility-first philosophy and is laser-focused on providing the building blocks for amazing user interfaces for everyone on the Web.

## What's in the box?

- 🧰 A collection of quality components for building beautiful, accessible, and consistent user interfaces.
- 🎨 A curated CSS reset to kick off projects without having to think about styles up front.
- 🪙 Customizable design tokens that make it easy to change the look and feel any time.
- 🐭 A built-in autoloader that detects components in your HTML — even ones you add dynamically — and loads the bare minimum code for them to work.

## Where do I…?

- [Get started using Quiet UI](https://quietui.com/)
- [Meet the community and talk about the project](https://github.com/quietui/components/discussions)
- [Get help with something](https://github.com/quietui/components/discussions/categories/help-support)
- [Request a feature](https://github.com/quietui/components/discussions/categories/feature-requests)
- [Submit a bug report](https://github.com/quietui/components/issues/new/choose)

## Developer instructions

To launch the development server, use the following commands.

```sh
npm i
npm run start
```

This will launch a browser showing the docs. It will reload the page as you make changes to the project. When you're ready to create a production build of the project, use the following commands.

```sh
npm run build
```

The `dist` folder will contain the final build.

## About this project

Quiet was built in New Hampshire by me, [Cory LaViska](https://twitter.com/claviska), the creator of [Shoelace](https://shoelace.style/). With the success of Shoelace, many of you are probably wondering why I'd choose to build another UI library, and that's a reasonable question.

The truth is, Shoelace has matured a lot over the years. While that's a great thing for its users, as an artist, I've lost my canvas for creativity. I'm still committed to Shoelace and I think it has a very promising future, but I'm no longer in charge of its design or its day to day operations. It has a full team now and we're building an amazing product out of it. It's not my personal playground, anymore.

Enter Quiet, my creative outlet. A passion project. Something I'm building to explore new ideas and have fun with. It leans towards the bleeding edge of what's become possible with browsers in recent years. It thinks more about progressive enhancement than it probably should. Quiet is in no way meant to compete with Shoelace. It allows me to try new things that may or may not work and improve my skills as a designer and developer.

As a result, you'll find that Quiet is rather opinionated. If it's not exactly what you want, it's probably not a good choice for your next project. Maybe consider using Shoelace instead. For the rest of you — the ones who like living on the edge and playing with newer browser APIs — go ahead and use it to your heart's content.

But be warned…

Expect a long beta period…maybe forever. Expect breaking changes. Expect that PRs will be closed when they don't align with my vision for the project. Expect that features will land when I get around to them. Expect me to be very picky about what makes it into the library, its quality of code, and every other aspect of how the project is maintained. Expect that I won't always want a PR because I prefer to experiment with things myself.

With all due respect, I'm not building this for you. I'm building it for me.

But don't be afraid to learn from and have fun with it!

— [Cory LaViska](https://twitter.com/claviska)

### Accessibility commitment

I recognize the need for all users, regardless of ability and device, to have undeterred access to the websites and applications that are created with it. This is an important goal of my projects.

Oftentimes, people will ask "is it accessible?" I'm reluctant to answer because accessibility isn't binary — there's no simple "yes" or "no" response to provide. What seems accessible to a sighted user might be completely inaccessible to a non-sighted user. And even if you optimize for various screen readers, you still have to account for low-level vision, color blindness, hearing impairments, mobility impairments, and more.

Accessibility is something you have to continuously strive for. No individual contributor — or perhaps even an entire team — can claim their software is 100% accessible because of the sheer diversity of abilities, devices, assistive technologies, and individual use cases.

Furthermore, accessibility doesn't stop at the component level. Using accessible building blocks doesn't magically make the rest of your webpage or application compliant. There is no library or overlay that will make your software "fully accessible" without putting in the effort. It's also worth noting that web components are still somewhat bleeding edge, so browsers, assistive devices, and even specifications are still evolving to help improve accessibility on the web platform.

My commitment to my users is this: Everything I develop will be built with accessibility in mind. I will test and improve every component to the best of my ability and knowledge. I will work around upstream issues, such as browser bugs and limitations, to the best of my ability and within reason.

I'm fully aware that I won't get it right every time for every user, so I invite the community to participate in this ongoing effort by submitting issues, pull requests, and discussions. Many accessibility improvements have already been made thanks to contributors submitting code, feedback, and suggestions.

This is the path forward. Together, we will continue to make accessible software for as many users as possible.

### AI-generated code

As an open source maintainer, I respectfully ask that you refrain from using AI-generated code when contributing to this project. This includes code generated by tools such as GitHub Copilot, even if you make alterations to it afterwards. While some of Copilot’s features are indeed convenient, the ethics surrounding which codebases the AI has been trained on and their corresponding software licenses remain very questionable and have yet to be tested in a legal context.

I realize that one cannot reasonably enforce this any more than one can enforce not copying licensed code from other codebases, nor do I wish to expend energy policing contributions. I would, however, like to avoid all ethical and legal challenges that result from using AI-generated code. As such, I respectfully ask that you refrain from using such tools when contributing to this project at this time. I will not knowingly accept any code that has been generated in such a manner.
