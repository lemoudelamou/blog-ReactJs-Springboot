package com.example.demo.my_users;

import com.example.demo.models.Connections;
import com.example.demo.models.MyUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class MyUsersService {
    @Autowired
    private MyUsersRepository myUsersRepository;
    @Autowired
    private ConnectionsRepository connectionsRepository;

    @Autowired
    AuthenticationManager authenticationManager;



    @Autowired
    private JavaMailSender mailSender;



    public MyUsers showUserByUserNameService(String userName){
        return myUsersRepository.findMyUsersByUserName(userName);
    }

    public MyUsers showUserByIdService(Long id){
        return myUsersRepository.findMyUsersById(id);
    }
    public void addUserService(MyUsers user){
        myUsersRepository.save(user);
    }


    public MyUsers showUser( Long id){
        return myUsersRepository.findMyUsersById(id);
    }

//User Connections Services
    //GET APIs
    public List<Connections> alltypeConnectionsUserService(String userName){
        return connectionsRepository.findConnectionsByReceiver_UserName(userName);
    }
    public List<Connections> showUserConnectionsListService(String userName){
        return connectionsRepository.findConnectionsByReceiver_UserNameAndAcceptedTrue(userName);
    }
    public List<Connections> showUserPendingListService(String userName){
        return connectionsRepository.findConnectionsByReceiver_UserNameAndAcceptedFalseAndRequestedTrue(userName);
    }
    public List<Connections> showUserFollowersListService(String userName){
        return connectionsRepository.findConnectionsByReceiver_UserNameAndFollowingIsTrue(userName);
    }
    //POST APIs
    public void addModConnectionService(Connections connection){
        connectionsRepository.save(connection);
    }
    public void removeConnectionService(Long id){
        connectionsRepository.deleteById(id);
    }

    public Connections checkConnectionStatus(String receiver_userName, String sender_userName){
        return connectionsRepository.findConnectionsByReceiver_UserNameAndSender_UserName(receiver_userName, sender_userName);
    }

    public void sendVerificationEmail(MyUsers user, String siteURL)
            throws  UnsupportedEncodingException, MessagingException {
        String toAddress = user.getEmail();
        String fromAddress = "cabiste81@live.fr";
        String senderName = "Tech Blog";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUserName());

        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);


        mailSender.send(message);

    }



    public String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }


    public void updateUser(MyUsers user) {
        Optional<MyUsers> myUsers = myUsersRepository.findById(user.getId());

        myUsersRepository.save(myUsers.get());

    }





}
