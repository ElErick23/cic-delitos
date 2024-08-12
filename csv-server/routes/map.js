const express = require("express");
const { Connection } = require("../postgres");
const router = express.Router();

router.get("/delitos_genero", async (req, res) => {
  Connection.db.query('SELECT * FROM public.delitos_genero')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_violentos", async (req, res) => {
  Connection.db.query('SELECT * FROM public.delitos_violentos')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_genero/graph1", async (req, res) => {
  Connection.db.query('SELECT "AlcaldiaHechos", COUNT("AlcaldiaHechos") from public.delitos_genero group by "AlcaldiaHechos";')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_genero/graph2", async (req, res) => {
  Connection.db.query( 'select "HoraHecho", COUNT("HoraHecho") from public.delitos_genero where "HoraHecho" IS NOT NULL group by "HoraHecho";')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })

})

router.get("/delitos_genero/graph3", async (req, res) => {
  Connection.db.query(`
   SELECT 
  CASE 
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 1 THEN '0-9'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 2 THEN '10-19'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 3 THEN '20-29'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 4 THEN '30-39'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 5 THEN '40-49'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 6 THEN '50-59'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 7 THEN '60-69'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 8 THEN '70-79'
    WHEN width_bucket("Edad"::numeric, 0, 100, 10) = 9 THEN '80-89'
    ELSE '90+'
  END AS age_group,
  COUNT(*) AS count
FROM 
  public.delitos_genero
WHERE 
  "Edad" IS NOT NULL
GROUP BY 
  age_group
ORDER BY 
  age_group;
  `)
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    });
});


router.get("/delitos_genero/graph4", async (req, res) => {
  Connection.db.query('SELECT "AlcaldiaHechos", COUNT("AlcaldiaHechos") from public.delitos_violentos group by "AlcaldiaHechos";')
    .then((data) => {
      return res.send(data).status(200);
    })
    .catch((error) => {
      return res.send(error).status(500);
    })
})

module.exports = router;