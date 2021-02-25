# Jekyll and the Teach LA Static Site

This is a part-Jekyll tutorial, part static-site walkthrough. The goal after this is to be equipped with the skills necessary to run our static site team! In this though, we'll go a bit fast on the basics; in particular, we assume pretty good familiarity with HTML, CSS, the command line, and a passing understanding of SASS.

## Table of Contents

## Setup

If you haven't already, please set up your dev environment. As of writing, [this page](https://teachla.uclaacm.com/docs/dev-setup) has an in-depth walkthrough; in particular, we ask that you do install `rvm`.

Once you are done setup, you should have:

* `rvm`
* the `bundler` gem
* cloned the repo
* ran `bundle install`
* successfully run `bundle exec jekyll serve` with no errors

*Note: there's been a common issue with openssl on macOS; to fix, run `brew reinstall openssl` which should properly link it in.*

## Motivation and Background

Quickly, why do we do all of this? Why not just write HTML, CSS, and JS? A few reasons:

* in websites, you often need to repeat code frequently: ex navbars, footers, calls-to-actions. It'd be nice if we could have one place to write that code, and then automatically update every location!
* our website will generate pages *from* data: a list of all lessons in a class, our dev projects, or team members. It would be good to have programming primitives like for loops and if statements to "generate" HTML.
* there are files that non-devs will have to edit (like their team profile, or class information). We want to make editing this as seamless, automated, and low-barrier as possible.
* we want all of this to be fast and reliable for the user: JavaScript manipulation and things like React are too much overhead for a non-interactive site.

All of this points to a type of software called a **static-site generator** (SSGs). SSGs allow you to scaffold out the content of your website in some language, and then "compile" it into HTML and CSS. This lets you use all sorts of neat programming tools (loops, conditionals, includes, data structures) while still keeping the output code lean.

Our static site generator is called [Jekyll](https://jekyllrb.com). It's written in [Ruby](https://www.ruby-lang.org/en/), one of the most popular web languages. We picked Jekyll for a few reasons:

* it is one of the most popular static site generators, which means it has a vibrant community and lots of documentation + plugins.
* it's very mature, so features are generally well-developed and tested.
* it has first-class support on GitHub; GitHub actually started off as a primarily ruby-focused community, so Jekyll was a natural fit. You can auto-generate Jekyll repos into GitHub Pages!
* most macOS machines have Ruby pre-installed (albeit not at the "right" version), which can make this easier than using `npm` and node.
* when Matt first made this site, he had the most experience with Jekyll.

That being said, Jekyll has its cons too:

* compared to [Hugo](https://gohugo.io/), it is slower (by quite a bit!)
* it is opinionated, which means it has a different featureset / internal data structure compared to [Hugo](https://gohugo.io/) or [Eleventy](https://www.11ty.dev/)
* Ruby isn't a very common language that many college developers now, so onboarding can be tricky. You don't *need* to write Ruby code for Jekyll itself, but writing plugins, CI, etc. does.
* (somewhat obviously) it has less features than server-side rendered frameworks like [Gatsby](https://www.gatsbyjs.com/)

### An aside on the Ruby ecosystem

This section could be much longer, but just some quick notes to point out:

* Ruby has a package manager called [RubyGems](https://rubygems.org/). You use it with `gem` commands, like when you install `bundler`.
* [`bundler`](https://bundler.io/) is a Ruby project environment manager. You can think of it somewhat like `npm`; you use it, in conjunction with `Gemfile` and `Gemfile.lock` (the `package.json` and `package-lock.json` equivalents) to manage the dependencies that your project needs.
* [`rake`](https://github.com/ruby/rake) is a build utility for Ruby (i.e. Ruby `make`). We don't *really* use it to its full potential, but it is useful!

And some stuff on Ruby itself:

* Ruby itself is an interpreted, dynamically-typed, general-purpose programming language. It is somewhat controversial in its design decisions, either known as particularly elegant/simple or extremely confusing.
* Ruby is particularly popular when paired with [Rails ("Ruby on Rails")](https://rubyonrails.org/), a web application framework. When Ruby on Rails was first released, it was a significant departure from other server-side web app frameworks (ex PHP/LAMP, Java), and has influenced many successors like [Django](https://www.djangoproject.com/), [Laravel](https://laravel.com/), and arguably JS frameworks like React, Angular, Ember, and Vue.
* Ruby was also the original implementation of [Sass](https://sass-lang.com/), though that implementation has reached end-of-life; the official implementations are now in Dart, C++, and JS.

## Jekyll, the Important Parts

This next section is a slightly unconventional approach to introducing Jekyll. Instead of replacing the [official tutorial](https://jekyllrb.com/docs/step-by-step/01-setup/), I want to instead focus on approaching Jekyll as a tool that converts data to pages. As a result, we won't cover *all* of the features that Jekyll (I'll refer you to the docs to cover what I miss). Given the time restraints, I'm willing to take this tradeoff, but I also think this way will set you up for future Jekyll success.

1. Converting constants to HTML (this will also be a syntax intro)
2. `_includes` and `_layouts`: HTML as data
3. `_data` and control flow: converting data into elements on a page
4. **collections**: converting data *into* a page
5. SASS: CSS as data

### Converting constants to HTML

Let's say we have a "constant" that is the same across our website: our Facebook page link, the last time the site was edited, or our contact email. It'd be great if we didn't have to copy-paste this across the entire site. Luckily, Jekyll has a solution.

You can peep the file `_config.yml`, which *every* Jekyll project must have. In the Teach LA website, we've got entries like:

```yml
# _config.yml
title: ACM Teach LA
email: acmteachla@gmail.com
description: >-
  ACM Teach LA is an non-profit outreach organization at UCLA dedicated to providing equal access to computer science education for all students in Los Angeles.
baseurl: ""
url: "https://teachla.uclaacm.com"
twitter:
  username: uclaacm
  image: https://teachla.uclaacm.com/img/teachLA_logo_light.png
github_username: uclaacm
...
```

*Pro tip: you'll see that files/folders with a `_` are related to Jekyll.*

This file is a configuration file for our entire project, and is in the [YAML](https://yaml.org/) file format. Like JSON, YAML is a key-value data format: for example, the key for the first line is `title`, and the value is `ACM Teach LA`.

Every entry in `_config.yml` defines a key-value pair that we can use across the entire site - a constant, if you will.

If we then wanted to use a constant, we can open up *any* HTML file and do two things:

* add (if it's not already there) "front matter" - a pair of `---` that tell Jekyll to "compile" your file
* use the `{{site.VARIABLE}}` liquid tag.

The most basic example would be to create a brand-new HTML file, and do

```html
---

---

{{site.github_username}}

```

Here's a more realistic example in `about.html`, the page that renders the `/about` route:

```html
# about.html

---
layout: default
title: "About"
permalink: "/about"
---

...

<p>
  If you have other questions, you can also send us an email at <a class="tla-link" href="mailto:{{site.email}}">{{site.email}}</a>!
</p>
```

This would "compile" into:

```html
<p>
  If you have other questions, you can also send us an email at <a class="tla-link" href="mailto:acmteachla@gmail.com">acmteachla@gmail.com</a>!
</p>
```

We've accidentally learned some more conceptual things:

* the `{{ }}` tag "renders" any Jekyll variable. You can think of this like a print statement! It is one of many tags in [Liquid](https://shopify.github.io/liquid/), the templating language that Jekyll uses
* we can bop `{{ }}` tags anywhere we want!
* it looks like we can configure some things in the front matter ... but more on that in a bit.

And voila! We've done our first "hello world"-esque example. On to bigger things!

### `_includes`: HTML as data

So far, we've shown that we can include constants like strings. But what about HTML? Can we do that?

Turns out we can! We'll discuss two different ways we can manipulate HTML (and more) as data: `_includes`, which work like imports/include directives, and `_layouts`, which act as a wrapper.

First, includes. What if we want to repeat a common thing on our website, like a "call to action"? Without Jekyll, we'd have to copy-paste it a million times, and update it each time. With Jekyll, we'll do a two-step process:

1. define a component in `_includes`
2. use it with `{% include COMPONENT.html %}` - note that it's `{% %}`, not `{{ }}`

Here's a trivial example. In `_includes/owo.html`:

```html
<p>owo</p>
```

Then, in any other Jekyll page,

```html
{% includes owo.html %}
{% includes owo.html %}
{% includes owo.html %}
{% includes owo.html %}
```

renders

```html
<p>owo</p>
<p>owo</p>
<p>owo</p>
<p>owo</p>
```

A more non-trivial example that renders our call to action, in `_includes/contact-cta.html`

```html
<div class="my-3 text-center">
    <hr class="divider" />
    <h2 class="title">Interested in working with us?</h2>
    <br />
    <p>
        are you...
    </p>
    <p class="bottom-button-container">
        <a class="button" href="{{site.baseurl}}/join">
            <span class="fa fa-fw fa-chalkboard-teacher"></span> Looking to Teach
        </a>
        <a class="button" href="{{site.baseurl}}/dev">
            <span class="fa fa-fw fa-code"></span> Looking to Code
        </a>
        <a class="button" href="{{site.baseurl}}/about#school-join">
            <span class="fa fa-fw fa-school"></span> Representing a School
        </a>
    </p>
    <p class="title">or, send us an email at <a class="tla-link" href="mailto:{{site.email}}">{{site.email}}</a></p>
</div>
```

Then, in many of our pages, like `dev.html`, we end with:

```html
---

---

...

{% include contact-cta.html %}
```

Already, this makes life a lot easier. You can also [pass in parameters to `includes`](https://jekyllrb.com/docs/includes/#passing-parameters-to-includes).

### `_layouts`

Another frequent type of "HTML as data" operation is using a "layout". Layouts, deep down, are `_includes` that "wrap" around your entire page.

Here's how you'd make your own layout:

1. define a file in `_layouts` with a `{{content}}` tag
2. use the layout with the `layout:` frontmatter

As a trivial example, consider that every page has an `html` tag:

```html
<html>
  ...
</html>
```

We could define a layout `_layouts/html.html`:

```html
---

---

<html>
  {{content}}
</html>
```

Then, any time we use it - like in this arbitrary file

```html
---
layout: html
---

bloop
```

gets rendered into

```html
<html>
  bloop
</html>
```

Some more fleshed out examples:

Our "default" layout, which includes our navbar, footer, `<head>` files (`_layouts/default.html`):

```html
<!DOCTYPE html>
<html lang="en">

  {%- include head.html -%}

  <body>

    {%- include header.html -%}
    <script>
      function logTopSecretMessage(message){
        console.log(
          `%c${message}`,
          "color:#A1D900;"
        )
      }

      logTopSecretMessage("Hey! You there! Yes, you, the person going through our JS logs.");
      logTopSecretMessage("Don't worry, our site isn't collecting any data about you, or anything, really. Pinky promise.");
      logTopSecretMessage("You look like somebody who likes web programming and hacking. Why not join our dev team? Check out https://teachla.uclaacm.com/dev");
    </script>
    <div class="container container-fill {% if layout.fw or page.fw %}{% else %}container-restricted{% endif %}">
      {{ content }}
    </div>

    {%- include footer.html -%}
  </body>
</html>
```

Demonstrating nested layouts with `_layouts/report.html`:

```html
---
layout: default
---
<article>
    <h1 class="title page-title">Report: {{page.title}}</h1>
    <p>
        Authored by the Teach LA community, with significant contributions from {{page.author}}.
    </p>
    <p>
        Date published: {{ page.date | date: "%b %-d, %Y" }}.
    </p>
    <hr class="divider" />
    <div class="generated-content">
        {{content}}
    </div>
    <hr class="divider" />
    <p>
        Thank you for reading this report, <b>{{page.title}}</b>. It was authored by the Teach LA community, with significant contributions from {{page.author}}.
    </p>
</article>
<p>
    <a class="tla-link" href="{{site.baseurl}}/reports">See more reports here.</a>
</p>
```

Layouts are one of the *most* powerful parts of Jekyll - layouts alone have cut down code duplication on projects I've worked on by over 50%!

### `_data` and control flow: converting data into elements on a page

### **collections**: converting data *into* a page

### SASS: CSS as data
