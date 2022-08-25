import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function createAdmin() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 10);

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", driver_license, created_at) values ('${id}', 'thiago', 'thiago@admin.com', '${password}', true, '180234679', 'now()')`,
  );

  await connection.close();
}

createAdmin().then(() => console.log('admin created'));
