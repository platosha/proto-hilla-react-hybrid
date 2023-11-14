package com.example.application;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("anotherflow")
public class AnotherFlow extends Div {
    public AnotherFlow() {
        add("Another Flow");
    }
}
