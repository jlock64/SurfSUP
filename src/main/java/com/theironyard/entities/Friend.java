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

    @Column
    boolean isFriend;

    @Column
    boolean invitationStage;

    public Friend() {
    }

    public Friend(User friendA, User friendB) {
        this.friendA = friendA;
        this.friendB = friendB;
    }

    public User getFriendA() {
        return friendA;
    }

    public void setFriendA(User friendA) {
        this.friendA = friendA;
    }

    public User getFriendB() {
        return friendB;
    }

    public void setFriendB(User friendB) {
        this.friendB = friendB;
    }

    public boolean isFriend() {
        return isFriend;
    }

    public void setIsFriend(boolean isFriend) {
        this.isFriend = isFriend;
    }

    public boolean isInvitationStage() {
        return invitationStage;
    }

    public void setInvitationStage(boolean invitationStage) {
        this.invitationStage = invitationStage;
    }
}
