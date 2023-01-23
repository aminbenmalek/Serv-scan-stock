import oracleDB from "oracledb";

const listeArticles = async (req, res) => {
  /* try {
        oracleDB.initOracleClient({libDir: 'E:\\instantclient_21_8'});
      } catch (err) {
        console.error('Whoops!');
        console.error(err);  
        process.exit(1); 
      }*/
  let connection;
  const tab = [];
  let n = 0;
  try {
    connection = await oracleDB.getConnection({
      user: "medina01",
      password: "medina01",
      connectionString: "localhost/orcl",
    });
    console.log("connection avec oracle est succés");
    connection.execute(
      "SELECT * from article",

      (err, resultat) => {
        if (resultat.rows.length == 0) {
          console.log("tableau est vide");
        } else {
          resultat.rows.map((r) => {
            tab.push(r);
            n++;
          });

          res.json(tab);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("connection arréter avec succés");
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};

const articleParCAB = async (req, res) => {
  let connection;
  const tab = [];
  let n = 0;
  console.log(req.params);
  try {
    connection = await oracleDB.getConnection({
      user: "medina01",
      password: "medina01",
      connectionString: "localhost/orcl",
    });
    console.log("connection avec oracle est succés");
    connection.execute(
      `SELECT STOCK_COURANT,lib_art,p_u_a,A.code_art from article A,magasin_article M where a.code_art=M.code_art and cod_bar=${req.params.bar}`,

      (err, resultat) => {
        if (resultat.rows.length == 0) {
          console.log("tableau est vide");
        } else {
          resultat.rows.map((r) => {
            tab.push(r);
            n++;
          });

          res.json(tab[0]);
          console.log(tab[0]);
          console.log(tab[1]);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("connection arréter avec succés");
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
const detail_liv = async (req, res) => {
  let connection;
  const tab = [];
  let n = 0;
  try {
    connection = await oracleDB.getConnection({
      user: "medina01",
      password: "medina01",
      connectionString: "localhost/orcl",
    });
    console.log("connection avec oracle est succés");
    console.log(req.params.bar);
    connection.execute(
      ` SELECT to_char(date_l,'mm/yyyy')dt ,sum(d.unite)qte,round(sum(round(montant/3 ,3)),3)mnt,to_char(date_l,'yyyy/mm') from detail_liv D,article A
      where A.code_art=D.code_art and A.cod_bar=${req.params.bar}
       group by to_char(date_l,'mm/yyyy'),to_char(date_l,'yyyy/mm') 
      order by  to_char(date_l,'yyyy/mm')`,

      (err, resultat) => {
        console.log(resultat?.rows?.length);
        if (resultat?.rows?.length == 0) {
          console.log("tableau est vide");
          res.status(404).json({ message: "Element n'existe pas!" });
        } else {
          resultat?.rows?.map((r) => {
            tab.push(r);
            console.log(tab);
            n++;
          });

          res.json(tab);
          console.log(tab[0]);
          console.log(tab[1]);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("connection arréter avec succés");
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
const test_proc = async (req, res) => {
  let connection;
  const tab = [];
  let n = 0;
  try {
    connection = await oracleDB.getConnection({
      user: "medina01",
      password: "medina01",
      connectionString: "localhost/orcl",
    });
    console.log("connection avec oracle est succés");
    const resultat = await connection.execute(
      `BEGIN
    INIT_INV();
  END;`
    );
    console.log(resultat);
  } catch (error) {
    console.log(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("connection arréter avec succés");
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
//Fonction d'insertion dans la table work inventaire
const work_inv_insert = async (req, res) => {
  //Déclaration variable connection
  let connection;

  try {
    //Connection avec la base de données
    connection = await oracleDB.getConnection({
      user: "medina01",
      password: "medina01",
      connectionString: "localhost/orcl",
    });

    console.log("Connection faite avec succés");

    req.body.map(async (o) => {
      /* const code_art = o.code_art;
      const code_bar = o.code_bar;
      const lib_art = o.lib_art;
      const qte_inv = o.qte_inv;*/
      let params = {
        p1: o.code_art,
        p2: o.code_bar,
        p3: o.lib_art,
        p4: o.qte_inv,
      };
      const resultat = connection.execute(
        `BEGIN insert_work_inv(:p1,:p2,:p3,:p4); END;`,
        params
      );
    });
    res.json({ message: "Ajout faite avec succés!" });
    /**/
  } catch (error) {
    res.json(error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("connection arréter avec succés");
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
export { listeArticles, articleParCAB, detail_liv, test_proc, work_inv_insert };
