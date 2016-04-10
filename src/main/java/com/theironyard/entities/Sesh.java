package com.theironyard.entities;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Calendar;

/**
 * Created by keatonfoster on 4/7/16.
 */
@Entity
@Table(name = "seshs")
public class Sesh {
    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    User user;

    @Column(nullable = false)
    Boolean isSurf;
    // true means surf session, false means sup session

    @Column(nullable = false)
    String time;

    @Column(nullable = false)
    String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Boolean getIsSurf() {
        return isSurf;
    }

    public void setIsSurf(Boolean surf) {
        isSurf = surf;
    }

    public Boolean getSurf() {
        return isSurf;
    }

    public int getId() {
        return id;
    }
}
