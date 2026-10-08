# Graduation photographs

Add the portrait as `portrait.jpg` here and memory photographs to `gallery/`.
Then update `app/graduation/graduation.config.ts`:

```ts
images: {
  portrait: {
    src: "/images/graduation/portrait.jpg",
    alt: "Thân Quốc Thịnh trong ngày tốt nghiệp",
    position: "50% 25%",
  },
  gallery: [
    {
      src: "/images/graduation/gallery/01.jpg",
      alt: "Thịnh cùng bạn bè tại trường",
      caption: "Những người bạn, những năm tháng.",
      position: "50% 30%",
    },
  ],
}
```

Use 3–6 real photos. Portrait: 4:5 or 3:4, ideally 1200px wide.
Adjust `position` to keep the face visible in the responsive crop.
Empty paths display designed placeholders without requesting missing files.
Local public paths need no additional Next/Image configuration.
