const { Connection } = require("./postgres");
const DelitosGeneroJSON = require("./output/Delitos_Genero_Preproceso.json");
const DelitosViolentosJSON = require("./output/Delitos_Violentos_Preproceso.json");

async function dropTableIfExists(db, tableName) {
    try {
        await db.query(`DROP TABLE IF EXISTS ${tableName}`);
        console.log(`Tabla ${tableName} eliminada (si existía).`);
    } catch (error) {
        console.error(`Error al intentar eliminar la tabla ${tableName}:`, error);
    }
}

async function createTable(db, tableName, sampleData) {
    const columns = Object.keys(sampleData[0]).map(key => `"${key}" TEXT`).join(', ');
    const query = `CREATE TABLE ${tableName} (${columns})`;
    try {
        await db.query(query);
        console.log(`Tabla ${tableName} creada exitosamente.`);
    } catch (error) {
        console.error(`Error al crear la tabla ${tableName}:`, error);
        throw error;
    }
}

async function insertData(db, tableName, data) {
    for (const delito of data) {
        const columns = Object.keys(delito).map(key => `"${key}"`).join(', ');
        const placeholders = Object.keys(delito).map((_, index) => `$${index + 1}`).join(', ');
        const query = `
            INSERT INTO ${tableName} (${columns})
            VALUES (${placeholders})
        `;
        const values = Object.values(delito);

        try {
            await db.query(query, values);
            console.log(`Registro con idCarpeta ${delito.idCarpeta} se ha guardado exitosamente en ${tableName}`);
        } catch (error) {
            console.error(`Error al insertar registro con idCarpeta ${delito.idCarpeta} en ${tableName}:`, error);
            console.log(`idCarpeta: ${delito.idCarpeta} NOTIFICAR AL PROGRAMADOR`);
            throw error;
        }
    }
}

async function main() {
    let db;
    try {
        db = await Connection.open();
        console.log("Conexión a la base de datos establecida.");

        // Recrear tabla delitos_genero
        await dropTableIfExists(db, 'public.delitos_genero');
        await createTable(db, 'public.delitos_genero', DelitosGeneroJSON);
        await insertData(db, 'public.delitos_genero', DelitosGeneroJSON);

        // Recrear tabla delitos_violentos
        await dropTableIfExists(db, 'public.delitos_violentos');
        await createTable(db, 'public.delitos_violentos', DelitosViolentosJSON);
        await insertData(db, 'public.delitos_violentos', DelitosViolentosJSON);

        console.log("Proceso completado exitosamente");
    } catch (error) {
        console.error("Error en el proceso principal:", error);
        process.exit(1);
    } finally {
        if (db) {
            await db.end();
            console.log("Conexión a la base de datos cerrada");
        }
    }
}

main();