import { z } from 'zod/v4'

const Blog = z.object({
  title: z.string().min(4),
  description: z.string().min(4)
})

export function validateTodo(input) {
  return Blog.safeParse(input)
}

export function validatePartialTodo(input) {
  return Blog.partial().safeParse(input)
}
