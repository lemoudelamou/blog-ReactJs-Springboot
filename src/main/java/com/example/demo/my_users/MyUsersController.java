package com.example.demo.my_users;

import java.security.Principal;

import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.example.demo.models.Connections;
import com.example.demo.models.MyUsers;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class MyUsersController {
    @Autowired
    private MyUsersService myUsersService;
    @Autowired
    private MyUsersRepository myUsersRepository;


    //User APIs
    @GetMapping("/user/profile") //Private User Profile
    MyUsers userProfile(Principal principal){
        return myUsersService.showUserByUserNameService(principal.getName());
    }


    @GetMapping("/user/{userName}") //Public User Profile
    public MyUsers publicProfile(@PathVariable String userName){
        return myUsersService.showUserByUserNameService(userName);
    }



    @PostMapping("/users/{id}")
    public ResponseEntity<MyUsers> updateUser(
            @PathVariable(value = "id") Long userId, @Valid @RequestBody MyUsers userDetails)
            throws ResourceNotFoundException {

        MyUsers user =
                myUsersRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));

        user.setUserName(userDetails.getUserName());
        user.setBio(userDetails.getBio());
        user.setOccupation(userDetails.getOccupation());
        user.setLocation(userDetails.getLocation());
        final MyUsers updatedUser = myUsersRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/showProfile/{id}")
    public MyUsers showUser(@PathVariable("id") Long id){
        return myUsersService.showUser(id);
    }




    //Connections APIs
    @GetMapping("/user/connections-all-type/{userName}")
    public List<Connections> getAllTypeConnectionsUSer(@PathVariable String userName){
        return myUsersService.alltypeConnectionsUserService(userName);
    }
    @GetMapping("/user/connections/{userName}")
    public List<Connections> userConnections(@PathVariable String userName){
        return myUsersService.showUserConnectionsListService(userName);
    }
    @GetMapping("/user/pending-connections/{userName}")
    public List<Connections> userConnectionsPending(@PathVariable String userName){
        return myUsersService.showUserPendingListService(userName);
    }
    @GetMapping("/user/followers/{userName}")
    public List<Connections> userFollowers(@PathVariable String userName){
        return myUsersService.showUserFollowersListService(userName);
    }
    @PostMapping("/user/connections/add")
    public void addModConnection(@RequestBody Connections connection){
        myUsersService.addModConnectionService(connection);
    }
    @GetMapping("user/connections/remove/{id}")
     public void removeConnection(@PathVariable Long id){
        myUsersService.removeConnectionService(id);
     }

    @PostMapping("/user/connections/status")
    public Connections connectionStatus(@RequestBody ObjectNode jsonNodes){
        String receiver = jsonNodes.get("receiver").asText();
        String sender = jsonNodes.get("sender").asText();
        return myUsersService.checkConnectionStatus(receiver, sender);
    }


    //TEST APIs
    @GetMapping("/user")
    public String userHome(){
        return "Welcome User";
    }

    @PostMapping("/user/add/")
    public void addUser(@RequestBody MyUsers user){
        myUsersService.addUserService(user);
    }
    @GetMapping("/admin")
    public String adminHome(){
        return "Welcome Admin";
    }

    @RequestMapping("/secured")
    public String secured(){
        System.out.println("Inside secured()");
        return "Hello user !!! : " + new Date();
    }
}
