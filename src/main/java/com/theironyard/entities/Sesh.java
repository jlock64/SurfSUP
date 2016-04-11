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
    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    User user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "sesh")
    @JsonIgnore
    private List<Join> joinsList;

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

    public int getId() {
        return id;
    }
}
