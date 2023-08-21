# System Worker

This is basically and express server that has two end points `/ - to get status` & `/transfom to upload and convert` **CSV** files to **JSON**

## Environment Variables

```env
PORT = <port number>
NAME = <name to id server>
```

## Idea

The **idea** is to deploy two or more instances of this worker and then load balance between them from the Front-End.
Not the must ideal solution but it'll have to do.
