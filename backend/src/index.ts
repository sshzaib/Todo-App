import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
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
    await prisma.todo.create({
      data: {
        title: title,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "error creating todo" });
  }
  res.status(200).json({ message: "todo created" });
});

//update todo
app.put("/todo", async (req, res) => {
  const { id, title } = req.body;
  try {
    await prisma.todo.update({
      data: {
        title,
      },
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "todo updated" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "error updating todo" });
  }
});

//delete todo
app.delete("/todo", async (req, res) => {
  const { id } = req.body;
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
