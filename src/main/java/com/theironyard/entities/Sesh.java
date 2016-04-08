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
    LocalDateTime time;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Boolean getSurf() {
        return isSurf;
    }

    public void setSurf(Boolean surf) {
        isSurf = surf;
    }
}
