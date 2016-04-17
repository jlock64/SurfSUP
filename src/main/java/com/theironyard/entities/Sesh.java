package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * Created by keatonfoster on 4/7/16.
 */
@Entity
@Table(name = "seshs")
public class Sesh {

    //VARIABLES
    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sesh")
    @JsonIgnore
    private List<Join> joinsList;

    @Column(nullable = false)
    Boolean isSurf;
    // true means surf session, false means sup session

    @Column(nullable = false)
    String time;

    @Column(nullable = false)
    String location;

    @Column(nullable = false)
    double lat;

    @Column(nullable = false)
    double lon;

    //GETTERS/SETTERS
    public String getLocation() {
        return location;
    }

    public User getUser() {
        return user;
    }

    public String getTime() {
        return time;
    }

    public Boolean getIsSurf() {
        return isSurf;
    }

    public int getId() {
        return id;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setIsSurf(Boolean surf) {
        isSurf = surf;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }
}
