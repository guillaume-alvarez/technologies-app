package com.galvarez.technologies;

import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JsonWriter {

    private static final Logger log = LoggerFactory.getLogger(JsonWriter.class);

    private static VelocityEngine createEngine() {
        Properties properties = new Properties();
        properties.setProperty("resource.loaders", "class");
        properties.setProperty("resource.loader.class.class",
                "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
        properties.setProperty("resource.default_encoding", "UTF-8");
        properties.setProperty("output.encoding", "UTF-8");
        properties.setProperty("runtime.strict_mode.enable", "true");
        return new VelocityEngine(properties);
    }

    private final VelocityEngine engine;

    JsonWriter() {
        engine = createEngine();
    }

    private String render(Map<String, Object> model, String templateName) {
        Template template = engine.getTemplate("com/galvarez/technologies/" + templateName, "UTF-8");
        VelocityContext context = new VelocityContext(model);
        StringWriter writer = new StringWriter();
        template.merge(context, writer);
        log.debug("Render:\n{}", writer.toString());
        return writer.toString();
    }

    private String renderGraph() throws IOException {
        Map<String, Object> data = new HashMap<>();
        try (Reader r = new InputStreamReader(
                Application.class.getResourceAsStream("/com/galvarez/technologies/technologies.plantuml"))) {
            data.put("technologies", new PlantumlParser().parse(new BufferedReader(r)));
        }
        return render(data, "technologies.vm");
    }

    public static void main(String... args) throws Exception {
        String out = args[0];

        JsonWriter writer = new JsonWriter();
        String json = writer.renderGraph();

        log.info("Write to {}:\n{}", out, json);

        try (Writer file = new FileWriter(out)) {
            file.write(json);
            file.flush();
        }
    }
}