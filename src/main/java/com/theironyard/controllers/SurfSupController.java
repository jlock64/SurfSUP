package com.theironyard.controllers;

import com.theironyard.entities.Friend;
import com.theironyard.entities.Join;
import com.theironyard.entities.Sesh;
import com.theironyard.entities.User;
import com.theironyard.services.FriendRepository;
import com.theironyard.services.JoinRepository;
import com.theironyard.services.SeshRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utilities.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by keatonfoster on 4/6/16.
 */
@RestController
public class SurfSupController {

    @Autowired
    UserRepository users;

    @Autowired
    SeshRepository seshs;

    @Autowired
    JoinRepository joins;

    @Autowired
    FriendRepository friends;

    Server dbui;

    @PostConstruct
    public void construct() throws SQLException, SQLException {
        dbui = Server.createWebServer().start();
    }

    @PreDestroy
    public void destroy() {
        dbui.stop();
    }

    // CREATE A USER
    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public User createUser (@RequestBody User user, HttpSession session) throws Exception {
        if (users.findByUsername(user.getUsername()) == null) {
            user.setPassword(PasswordStorage.createHash(user.getPassword()));
            session.setAttribute("username", user.getUsername());
            users.save(user);
            return user;
        }
        else {
            throw new Exception("Username already taken");
        }

    }

    // LOGIN
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User login (@RequestBody User user, HttpSession session) throws Exception {
        if (session.getAttribute("username") == null) {
            User existing = users.findByUsername(user.getUsername());
            if (existing != null) {

                //SUCCESS SCENARIO
                if (PasswordStorage.verifyPassword(user.getPassword(), existing.getPassword())) {
                    session.setAttribute("username", user.getUsername());
                    return user;

                    //PASSWORD FAIL SCENARIO
                } else if (!PasswordStorage.verifyPassword(user.getPassword(), existing.getPassword())) {
                    throw new Exception("Password do not match");
                }
            } else if (existing == null) {
                throw new Exception("Username does not exist in database");
            }
        }
        return null;
    }

    // LOGOUT
    @RequestMapping(path = "/logout", method = RequestMethod.GET)
    public void logout (HttpSession session) {
        session.invalidate();
    }

    // UPLOAD PROFILE PICTURE (WHEN ALREADY LOGGED IN)
    @RequestMapping(path = "/upload", method = RequestMethod.POST)
    public void addProfile (@RequestBody MultipartFile photo, HttpSession session) throws IOException {
        User existing = users.findByUsername((String) session.getAttribute("username"));

        // store photo file name in db
        File dir = new File("public/profile");
        dir.mkdirs();
        File photoFile = File.createTempFile("image", photo.getOriginalFilename(), dir);
        FileOutputStream fos = new FileOutputStream(photoFile);
        fos.write(photo.getBytes());
        existing.setPhotoFileName(photoFile.getName());

        users.save(existing);
    }

    // CREATE SESH
    @RequestMapping(path = "/sesh", method = RequestMethod.POST)
    public Sesh addSesh (@RequestBody Sesh sesh, HttpSession session) {
        User user = users.findByUsername((String) session.getAttribute("username"));
        sesh.setUser(user);
        seshs.save(sesh);

        //joins user and sesh in Joins table
        Join join = new Join(user, sesh);
        joins.save(join);
        return sesh;
    }

    // DISPLAY ALL SESHS
    @RequestMapping(path = "/sesh", method = RequestMethod.GET)
    public List<Sesh> displayAllSesh () {
        return (List<Sesh>) seshs.findAll();
    }

    //DISPLAY SESHS BY USER
    @RequestMapping(path = "/user/{id}/sesh", method = RequestMethod.GET)
    public List<Sesh> displaySeshByUser (@PathVariable("id") int id) {
        User user = users.findOne(id);
        List<Sesh> list = seshs.findAllByUser(user);
        return list;
    }

    //DISPLAY ALL USERS GOING TO SPECIFIC SESH
    @RequestMapping(path = "/join/sesh/{id}", method = RequestMethod.GET)
    public List<User> displayUserBySesh (@PathVariable("id") int id) {
        Sesh sesh = seshs.findOne(id);
        List<User> list = joins.findAllBySesh(sesh);
        return list;
    }

    //EDIT EXISTING SESH
    @RequestMapping(path = "/sesh", method = RequestMethod.PUT)
    public void editSesh (@RequestBody Sesh sesh) {
        seshs.save(sesh);
    }

    //ALTERNATIVE EDIT SESH
    @RequestMapping(path = "/sesh/{id}", method = RequestMethod.PUT)
    public void editSesh2 (@RequestBody Sesh newSesh, @PathVariable("id") int id) {
        seshs.save(newSesh);
    }

    //DELETE SESSION
    @RequestMapping(path = "/sesh/{id}", method = RequestMethod.DELETE)
    public void deleteSesh (@PathVariable("id") int id) {
        Sesh sesh = seshs.findOne(id);
        seshs.delete(sesh);
    }

    //DISPLAY ALL USERS
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public List<User> displayUser (HttpSession session) {
        List<User> userList = (List<User>) users.findAll();
        User user = users.findByUsername((String) session.getAttribute("username"));
        userList.remove(user);
        return userList;
    }

    //SEND FRIEND INVITATION (CREATES FRIEND OBJECT)
    @RequestMapping(path = "/friend", method = RequestMethod.POST)
    public void createFriend (HttpSession session, @RequestBody String usernameB) throws Exception {
        User userA = users.findByUsername((String) session.getAttribute("username"));
        User userB = users.findByUsername(usernameB);
        Friend friend = new Friend (userA, userB);
        if (friends.findFirstByFriendAAndFriendB(userA, userB) == null){
            friends.save(friend);
        } else {
            throw new Exception("Friendship already requested");
        }
    }

    //DISPLAY FRIENDS LIST
    @RequestMapping(path = "/friend", method = RequestMethod.GET)
    public List<User> friendList (HttpSession session) {
        User user = users.findByUsername((String) session.getAttribute("username"));
        List<Friend> allList = (List<Friend>) friends.findAll();
        List<User> listOfFriends = new ArrayList<>();
        for (Friend a : allList) {
            for (Friend b : allList) {
                if(a.getFriendA().getId()==b.getFriendB().getId() &&
                        a.getFriendB().getId() == b.getFriendA().getId() &&
                        a.getFriendA().getId() != user.getId()) {
                    listOfFriends.add(a.getFriendA());
                }
            }
        }
        return listOfFriends;
    }

    //REMOVE SOMEONE FROM FRIENDS LIST
    @RequestMapping(path = "/friend/{id}", method = RequestMethod.DELETE)
    public void removeFriend (@PathVariable("id") int id) {
        Friend friend = friends.findOne(id);
        Friend friend2 = friends.findFirstByFriendAAndFriendB(friend.getFriendB(), friend.getFriendA());
        friends.delete(friend);
        friends.delete(friend2);
    }

    //NUMBER OF FRIEND REQUESTS
    @RequestMapping(path = "/requestAmt", method = RequestMethod.GET)
    public int friendRequestsAmt (HttpSession session) {
        User user = users.findByUsername((String) session.getAttribute("username"));
        List<Friend> allList = (List<Friend>) friends.findAll();
        List<User> requestList = new ArrayList<>();
        for (Friend f : allList) {

            // populating requestList with users who "friended" current user
            if (f.getFriendB().getId()==user.getId()) {
                requestList.add(f.getFriendA());

                // removing users from requestList who have been "friended back" by current user
                for(Friend ff : allList) {
                    if (ff.getFriendA().getId() == user.getId()) {
                        requestList.remove(ff.getFriendB());
                    }
                }
            }
        }
        // requestList.size == number of pending requests
        return requestList.size();
    }

    //LIST OF ACTUAL FRIEND REQUESTS
    @RequestMapping(path = "/requests", method = RequestMethod.GET)
    public List<User> friendRequests (HttpSession session) {
        User user = users.findByUsername((String) session.getAttribute("username"));
        List<Friend> allList = (List<Friend>) friends.findAll();
        List<User> requestList = new ArrayList<>();
        for (Friend f : allList) {

            // populating requestList with users who "friended" current user
            if (f.getFriendB().getId()==user.getId()) {
                requestList.add(f.getFriendA());

                // removing users from requestList who have been "friended back" by current user
                for(Friend ff : allList) {
                    if (ff.getFriendA().getId() == user.getId()) {
                        requestList.remove(ff.getFriendB());
                    }
                }
            }
        }
        // requestList.size == number of pending requests
        return requestList;
    }
}
