package org.acme;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/mail")                                                          
public class MailResource {

    @Inject Mailer mailer;                                              

    @GET                                                                
    @Blocking                                                           
    public void sendEmail() {
        mailer.send(
                Mail.withText("quarkus@quarkus.io",                     
                    "Ahoy from Quarkus",
                    "A simple email sent from a Quarkus application."
                )
        );
    }

}