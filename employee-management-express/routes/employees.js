const query = `
    SELECT 
          u.id AS user_id,
          u.username AS user_name,
          u.email,
          u.status,
          COALESCE(d.name, "Unasigned") AS department_name
          FROM users u
          LEFT JOIN users_departments ud ON u.id = ud.user_id
          LEFT JOIN departments d ON d.id = ud.department_id
          ORDER BY u.id ASC;`;
