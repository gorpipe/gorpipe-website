# GORpipe public website

This the GORpipe public website.

## Writing a blog post

To write a blog post, create a markdown file in the blogposts directory. The file name should be both humand and url friendly, it will be used as the url slug. The posts should be written in [GitHub flavored markdown](https://guides.github.com/features/mastering-markdown/). All files should start with a front matter block like so:

```yml
---
title: "How to get started with GORpipe"
author: "Alison McNeil"
date: "2020-02-04"
image: /gorpipe.jpg
---
(body text here)
```

The fields should be self explanatory, but if you want to add an image as a hero image, drop it in the `public` folder and reference it by name, starting with a `/`, like in the example above.
