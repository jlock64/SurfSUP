package com.theironyard.controllers;

import org.h2.tools.Server;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.sql.SQLException;


/**
 * Created by keatonfoster on 4/6/16.
 */
@RestController
public class SurfSupController {

    Server dbui;

    @PostConstruct
    public void construct() throws SQLException, SQLException {
        dbui = Server.createWebServer().start();
    }

    @PreDestroy
    public void destroy() {
        dbui.stop();
    }

}
