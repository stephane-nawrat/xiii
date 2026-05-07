class AbstractModel {
  constructor({ table }) {
    this.table = table;
  }

  setDatabase(database) {
    this.database = database;
  }

  async findAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async find(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return rows[0];
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return result.affectedRows;
  }
}

export default AbstractModel;
