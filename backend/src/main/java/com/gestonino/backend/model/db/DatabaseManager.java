package com.gestonino.backend.model.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseManager {

    private static DatabaseManager instance;
    private final Connection connection;
    private final String databaseUrl = "jdbc:sqlite:gestionino.db";

    private DatabaseManager() throws SQLException {
        try {
            this.connection = DriverManager.getConnection(databaseUrl);
        } catch (SQLException ex) {
            throw new SQLException("Errore durante la connessione al database.", ex);
        }
    }

    public static DatabaseManager getInstance() {
            synchronized (DatabaseManager.class) {
                if (instance == null) {
                    try {
                        instance = new DatabaseManager();
                    } catch (SQLException ex) {
                        ex.printStackTrace();
                    }
                }
            }
        return instance;
    }

    public Connection getConnection() {
        return connection;
    }
}
