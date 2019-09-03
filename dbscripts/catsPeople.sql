SELECT c.id as cat_id, c.name as cat_name, c.age, c.breed, p.id, p.name as person_name
FROM cats_people cp
LEFT JOIN people p
ON cp.people_id = p.id
LEFT JOIN cats c
ON cp.cat_id = c.id