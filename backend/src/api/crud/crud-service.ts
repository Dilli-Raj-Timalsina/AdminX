import { type Request, type Response } from "express";
import { Pool } from "pg";
import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/models/service-response";
import { logger } from "@/server";
import { generateTableDefinition } from "./helpers/generate-table-defination";
import { Client } from "./entity/client.entity";

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export class CrudService {
  async findAll(req: Request, res: Response) {
    const query = req.query;
    const tableName = "clients";
    try {
      let sqlQuery = `SELECT * FROM ${tableName}`;
      const queryParams: any[] = [];
      if (Object.keys(query).length > 0) {
        const whereClauses = Object.keys(query).map((key, index) => {
          queryParams.push(query[key]);
          return `${key} = $${index + 1}`;
        });
        sqlQuery += ` WHERE ${whereClauses.join(" AND ")}`;
      }

      const result = await pool.query(sqlQuery, queryParams);
      return res.json(ServiceResponse.success("Records found", result.rows));
    } catch (error) {
      logger.error(`Error in findAll: ${(error as Error).message}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ServiceResponse.failure("Failed to fetch records", null));
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const tableName = "clients";
    try {
      const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE id = $1`,
        [id]
      );
      if (result.rows.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(ServiceResponse.failure("Record not found", null));
      }
      return res.json(ServiceResponse.success("Record found", result.rows[0]));
    } catch (error) {
      logger.error(`Error in findById: ${(error as Error).message}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ServiceResponse.failure("Failed to fetch record", null));
    }
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    try {
      const tableName = "clients";
      const tableCheckQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = $1
        )
      `;
      const tableExistsResult = await pool.query(tableCheckQuery, [tableName]);
      const tableExists = tableExistsResult.rows[0].exists;

      if (!tableExists) {
        const createTableQuery = generateTableDefinition(Client);
        await pool.query(createTableQuery);
      }

      const columns = Object.keys(data);
      const values = Object.values(data);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

      const result = await pool.query(
        `INSERT INTO ${tableName} (${columns.join(
          ", "
        )}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      return res
        .status(StatusCodes.CREATED)
        .json(ServiceResponse.success("Record created", result));
    } catch (error) {
      logger.error(`Error in create: ${(error as Error).message}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ServiceResponse.failure("Failed to create record", null));
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    try {
      const tableName = "clients";
      const setClause = Object.keys(data)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");
      const values = [...Object.values(data), id];

      const result = await pool.query(
        `UPDATE ${tableName} SET ${setClause} WHERE id = $${values.length} RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(ServiceResponse.failure("Record not found", null));
      }
      return res.json(
        ServiceResponse.success("Record updated", result.rows[0])
      );
    } catch (error) {
      logger.error(`Error in update: ${(error as Error).message}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ServiceResponse.failure("Failed to update record", null));
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tableName = "clients";
      const result = await pool.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
        [id]
      );
      if (result.rows.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(ServiceResponse.failure("Record not found", null));
      }
      return res.json(ServiceResponse.success("Record deleted", null));
    } catch (error) {
      logger.error(`Error in delete: ${(error as Error).message}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ServiceResponse.failure("Failed to delete record", null));
    }
  }
}

export const crudService = new CrudService();
