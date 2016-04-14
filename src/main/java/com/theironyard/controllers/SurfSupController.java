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
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;


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

    //SEND FRIEND REQUEST (CREATES FRIEND OBJECT)
    @RequestMapping(path = "/friend", method = RequestMethod.POST)
    public void createFriend (HttpSession session, @RequestBody String usernameB) throws Exception {
        User requester = users.findByUsername((String) session.getAttribute("username"));
        User approver = users.findByUsername(usernameB);
        Friend friend = new Friend (requester, approver);
        if (friends.findFirstByRequesterAndApprover(requester, approver) == null){
            friends.save(friend);
        } else {
            throw new Exception("Friendship already requested");
        }
    }

    //ACCEPTS FRIEND REQUEST
    @RequestMapping(path = "/friend/friend", method = RequestMethod.POST)
    public void acceptFriend (HttpSession session, @RequestBody String usernameB) throws Exception {
        User requester = users.findByUsername((String) session.getAttribute("username"));
        User approver = users.findByUsername(usernameB);
        Friend friend = new Friend (requester, approver);
        if (friends.findFirstByRequesterAndApprover(requester, approver) == null){
            friend.setIsApproved(true);
            friends.save(friend);
        } else {
            throw new Exception("Friendship already requested");
        }
    }

    //INVITE FRIENDS TO JOIN SESH (ID = USER BEING INVITED'S ID)
    @RequestMapping(path = "//join/{userId}/{seshId}", method = RequestMethod.POST)
    public void inviteFriendToJoin (@PathVariable("userId") int userId, @PathVariable("seshId") int seshId) {
        User invitedUser = users.findOne(userId);
        Sesh seshToJoin = seshs.findOne(seshId);
        Join join = new Join(invitedUser, seshToJoin);
        joins.save(join);
    }

    // LOGOUT
    @RequestMapping(path = "/logout", method = RequestMethod.GET)
    public void logout (HttpSession session) {
        session.invalidate();
    }

    // DISPLAY ALL SESHS (PUBLIC SESH LIST)
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

    //DISPLAY SESHS BY THE CURRENT USER AND HIS/HER FRIENDS
    @RequestMapping(path = "/user/friend/sesh", method = RequestMethod.GET)
    public List<Sesh> displayUserAndFriendsSeshs (HttpSession session) {
        User loggedIn = users.findByUsername((String) session.getAttribute("username"));
        List <Sesh> usersSeshs = seshs.findAllByUser(loggedIn);
        List <Sesh> friendsSeshs = new ArrayList<>();
        // friendsSesh is to be returned product

        List<Friend> allList = friends.findAllByRequester(loggedIn);
        allList.addAll(friends.findAllByApprover(loggedIn));
        //creates a list of friend objects that contain the current user

        //Credit Alex Hughes for Parallel Stream help
        ArrayList<User> friendsList = allList.parallelStream()
                .filter(Friend::getIsApproved)
                .map(friend -> {
                    if (friend.getRequester().getId() == loggedIn.getId()) {
                        return friend.getApprover();
                    }
                    else if (friend.getApprover().getId() == loggedIn.getId()) {
                        return friend.getRequester();
                    }
                    else return null;
                })
                .collect(Collectors.toCollection(ArrayList<User>::new));

        for (User user : friendsList) {
            friendsSeshs.addAll(seshs.findAllByUser(user));
        }
        friendsSeshs.addAll(usersSeshs);
        return friendsSeshs;
    }

    //DISPLAY ALL USERS
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public List<User> displayUser (HttpSession session) {
        List<User> userList = (List<User>) users.findAll();
        User user = users.findByUsername((String) session.getAttribute("username"));
        userList.remove(user);
        return userList;
    }

    //DISPLAY FRIENDS LIST
    @RequestMapping(path = "/friend", method = RequestMethod.GET)
    public List<User> friendList (HttpSession session) {
        User user = users.findByUsername((String) session.getAttribute("username"));
        List<Friend> allList = friends.findAllByRequester(user);
        allList.addAll(friends.findAllByApprover(user));
        //creates a list of friend objects that contain the current user

        //Credit Alex Hughes for Parallel Stream help
        ArrayList<User> friendsList = allList.parallelStream()
                .filter(Friend::getIsApproved)
                .map(friend -> {
                    if (friend.getRequester().getId() == user.getId()) {
                        return friend.getApprover();
                    }
                    else if (friend.getApprover().getId() == user.getId()) {
                        return friend.getRequester();
                    }
                    else return null;
                })
                .collect(Collectors.toCollection(ArrayList<User>::new));
        return friendsList;
    }

    //NUMBER OF FRIEND REQUESTS
    @RequestMapping(path = "/requestAmt", method = RequestMethod.GET)
    public int friendRequestsAmt (HttpSession session) {
        User user = users.findByUsername((String) session.getAttribute("username"));
        List<Friend> allList = (List<Friend>) friends.findAll();
        List<User> requestList = new ArrayList<>();
        for (Friend f : allList) {

            // populating requestList with users who "friended" current user
            if (f.getApprover().getId()==user.getId()) {
                requestList.add(f.getRequester());

                // removing users from requestList who have been "friended back" by current user
                for(Friend f2 : allList) {
                    if (f2.getRequester().getId() == user.getId()) {
                        requestList.remove(f2.getApprover());
                    }
                }
            }
        }
        // requestList.size == number of pending requests
        return requestList.size();
    }

    //LIST OF ACTUAL FRIEND REQUESTS
    @RequestMapping(path = "/requests", method = RequestMethod.GET)
    public List<User> friendRequests (HttpSession session) throws Exception {
        User user = users.findByUsername((String) session.getAttribute("username"));
        List<Friend> allList = (List<Friend>) friends.findAll();
        List<User> requestList = new ArrayList<>();
        if (allList != null) {
            for (Friend f : allList) {

                // populating requestList with users who "friended" current user
                if (f.getApprover().getId() == user.getId()) {
                    requestList.add(f.getRequester());

                    // removing users from requestList who have been "friended back" by current user
                    for (Friend ff : allList) {
                        if (ff.getRequester().getId() == user.getId()) {
                            requestList.remove(ff.getApprover());
                        }
                    }
                }
            }
        }
        if (requestList != null) {
            return requestList;
        }
        else {
            throw new Exception("No friend requests have been made for this user");
        }
    }

    //DISPLAY PROFILE
    @RequestMapping(path = "/user/{id}", method = RequestMethod.GET)
    public User showProfile (@PathVariable("id") int id) {
        User user = users.findOne(id);
        return user;
    }

    //DISPLAY USERS WHO JOINED A SESH (ID = SESH ID)
    @RequestMapping(path = "/sesh/{id}", method = RequestMethod.GET)
    public List<User> joinedUsers (@PathVariable("id") int id) {
        Sesh sesh = seshs.findOne(id);
        List<User> joined = new ArrayList<>();
        List<Join> all = (List<Join>) joins.findAll();
        for (Join j : all) {
            if (j.getSesh().getId() == id) {
                joined.add(j.getUser());
            }
        }
        return joined;
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

    //REMOVE SOMEONE FROM FRIENDS LIST
    @RequestMapping(path = "/friend/{id}", method = RequestMethod.DELETE)
    public void removeFriend (@PathVariable("id") int id, HttpSession session) {
        User loggedInUser = users.findByUsername((String) session.getAttribute("username"));
        User friendToRemove = users.findOne(id);
        Friend friend = friends.findFirstByRequesterAndApprover(loggedInUser, friendToRemove);
        Friend friend2 = friends.findFirstByRequesterAndApprover(friendToRemove, loggedInUser);
        friends.delete(friend);
        friends.delete(friend2);
    }

    //DENY FRIEND REQUEST (THE ID = FRIENDING USER ID)
    @RequestMapping(path = "/deny/{id}", method = RequestMethod.DELETE)
    public void denyFriendRequest (@PathVariable("id") int id, HttpSession session) {
        User loggedIn = users.findByUsername((String) session.getAttribute("username"));
        User requester = users.findOne(id);
        Friend friend = friends.findFirstByRequesterAndApprover(requester, loggedIn);
        friends.delete(friend);
    }
}
