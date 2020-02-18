# GORpipe public website

This the GORpipe public website.

## Writing a blog post

To write a blog post, create a markdown file in the blogposts directory. The file name should be both human and url friendly, it will be used as the url slug. The posts should be written in [GitHub flavored markdown](https://guides.github.com/features/mastering-markdown/). All files should start with a front matter block like so:

```yml
---
title: "How to get started with GORpipe"
author: "Alison McNeil"
date: "2020-02-04"
image: /blogs/gorpipe.jpg
---
(body text here)
```

A hero image should be included with a blog entry. Drop it in the `public/blogs` folder and reference it by name, starting with a `/blogs/`, like in the example above. Images should be at least 1200 px wide, and in at least 2:1 ratio (at least 600px height), but try to mind filesizes, e.g. by using compressed jpegs. Images cannot be larger than 5.5 mb. These constraints are both for asthetic reasons on this web page, as well as requirements on social media platforms for share cards.

Other images and elements can of course be included in the blog posts, as part of the markdown markup written in the post. [Refer to the github markdown documentation for details](https://guides.github.com/features/mastering-markdown/).

## Running locally

This website is built on the [next.js](https://nextjs.org/) framework. To run this project locally need to have [node.js](https://nodejs.org/) installed locally. After that is installed you should be able to run `npm i` in the project folder, followed by `npm run dev`. This should make the website available at `http://localhost:3000`.
