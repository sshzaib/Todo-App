import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

// get all todos
app.get("/", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "error getting todos" });
  }
});

//create a todo
app.post("/todo", async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title: title,
      },
    });
    res.status(200).json({ todo });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "error creating todo" });
  }
});

//update todo
app.put("/todo", async (req, res) => {
  const { id, title, complete } = req.body;
  try {
    const todo = await prisma.todo.update({
      data: {
        title,
        complete: complete,
      },
      where: {
        id: Number(id),
      },
    });
    console.log(todo);
    res.status(200).json({ message: "todo updated" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "error updating todo" });
  }
});

//delete todo
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "todo deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "error deleting todo" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on Post: ${PORT}`);
});
