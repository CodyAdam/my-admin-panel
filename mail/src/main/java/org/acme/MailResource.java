package org.acme;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.reactive.messaging.Incoming;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;

@ApplicationScoped
public class MailResource {
    @Inject Mailer mailer;
    

    // @Incoming("mail")
    public void sendEMail(){
        mailer.send(
            Mail.withText("fabien.goardou@etudiant.univ-rennes1.fr",
             "Alu", "Coucou oui oui oui"
             )
        );
    }

    @Incoming("mail")
    public void accountCreated(String email){
        mailer.send(
            Mail.withText(
                email, 
                "Account created", "Your account is now created"
            )
        );
    }

}
