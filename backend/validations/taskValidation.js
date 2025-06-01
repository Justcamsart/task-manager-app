// validations/taskValidation.js
import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  status: Joi.string().valid('À faire', 'En cours', 'Complété').required(),
  progress: Joi.number().min(0).max(100).required(),
  deadline: Joi.date().required()
});
export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('à faire', 'en cours', 'terminée').optional(),
  dueDate: Joi.date().min('now').optional()
});
