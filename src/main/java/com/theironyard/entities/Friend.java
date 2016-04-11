package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by noellemachin on 4/11/16.
 */
@Entity
@Table(name = "friends")
public class Friend {

    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    User friendA;

    @ManyToOne
    User friendB;

    @Column(nullable = false)
    boolean isFriend;

    @Column(nullable = false)
    boolean invitationStage;
}
