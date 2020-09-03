INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (400, "Brooke", "Rodriguez", 1, 401), (401, "Saku", "Samuelson", 2, 402), (402, "Jordan", "Wilts", 7, null), (403, "Mike", "Thompson", 3, 404), (404, "Dave", "Williams", 4, 402), (405, "Robert", "Mathers", 5, 406), (406, "Angie", "Marks", 6, 402);

INSERT INTO role(role_id, title, salary, department_id)
VALUES (1, "Design Engineer", 80000.00, 200), (2, "Engineering Manager", 125000.00, 200), (3, "Machinist", 90000.00, 210), (4, "Production Manager", 110000.00, 210), (5, "Quality Inspector", 80000.00, 220), (6, "Quality Manager", 125000, 220), (7, "Chief Officer Of Operations", 250000.00, 230);

INSERT INTO department(department_id, name)
VALUES (200, "Engineering"), (210, "Production"), (220, "Quality"), (230, "Executive Team");