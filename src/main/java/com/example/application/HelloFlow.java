package com.example.application;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("helloflow")
public class HelloFlow extends Div {
    public HelloFlow() {
        add("Hello from Flow");
    }
}
