package org.acme;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.inject.Inject;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.common.annotation.NonBlocking;

@Path("/mail")
public class MailResource {
    @Inject Mailer mailer;
    
    @GET
    @Blocking
    public void sendEMail(){
        mailer.send(
            Mail.withText("fabien.goardou@etudiant.univ-rennes1.fr",
             "Alu", "Coucou oui oui oui"
             )
        );
    }

    @GET
    @Path("/creation")
    @Blocking
    public void accountCreated(String email){
        mailer.send(
            Mail.withText(
                email, 
                "Account created", "Your account is now created"
            )
        );
    }

}
