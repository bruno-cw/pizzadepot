package client;
import java.io.File;

import org.hibernate.Session;

import util.HibernateUtil;
import entity.Message;

public class Main {
    public static void main(String[] args) {        
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
         Message message = new Message( "Hello Hibernate 5" );

        session.save(message);    

        session.getTransaction().commit();
        session.close();    
    }
}