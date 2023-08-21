# Distributed Task Processing System

A two part system built to load balance task between multiple servers (workers).

**This was built as a course work and is not practical or efficient solution**

## System Client

Single page web app that connects to workers to allow users convert **CSV** files to **JSON**
also servers as worker status check and a load balancer

### 📸 Screenshots

![Home Page](https://i.imgur.com/tonflq6.png "Home Page")

![JSON Result](https://i.imgur.com/K5I9pQ8.png "JSON Result")

### 🛠️ Built With

- [Nuxt.js](https://nuxtjs.org/) - The Intuitive Web Framework 🚀
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework packed with classes 💻

## System Worker

An express server that has two end points `/ - to get status` & `/transfom to upload and convert` **CSV** files to **JSON**

### Environment Variables

```env
PORT = <port number>
NAME = <name to id server>
```

### Idea

The **idea** is to deploy two or more instances of this worker and then load balance between them from the Front-End.
Not the must ideal solution but it'll have to do.
