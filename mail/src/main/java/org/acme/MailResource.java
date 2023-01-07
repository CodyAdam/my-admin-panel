package org.acme;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import io.vertx.core.json.JsonObject;

import io.smallrye.reactive.messaging.annotations.Blocking;

import org.eclipse.microprofile.reactive.messaging.Incoming;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import org.eclipse.microprofile.reactive.messaging.Message;

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
    public void accountCreated(JsonObject obj){

        String email = obj.getString("data");

        System.out.println("Received command for mail to " + email);

        Thread t = new Thread(() -> {
            System.out.println("Sending mail to " + email);
            mailer.send(
                    Mail.withText(
                            email,
                            "Account created", "Your account is now created"
                    )
            );
        });
        t.start();
    }

}
