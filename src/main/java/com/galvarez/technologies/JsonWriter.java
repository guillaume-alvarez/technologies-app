package com.galvarez.technologies;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Map;
import java.util.Map.Entry;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JsonWriter {

    private static final Logger log = LoggerFactory.getLogger(JsonWriter.class);

    public final class TechnologySerializer extends StdSerializer<Technology> {

        private static final long serialVersionUID = 1L;

        public TechnologySerializer() {
            this(Technology.class);
        }

        public TechnologySerializer(Class<Technology> t) {
            super(t);
        }

        @Override
        public void serialize(Technology tech, JsonGenerator jgen, SerializerProvider provider) throws IOException {
            jgen.writeStartObject();
            jgen.writeStringField("id", tech.getId());
            jgen.writeStringField("name", tech.getName());
            jgen.writeNumberField("rank", tech.getRank());
            jgen.writeBooleanField("root", tech.isRoot());
            jgen.writeStringField("text", tech.getText());

            jgen.writeFieldName("effects");
            jgen.writeStartObject();
            for (Entry<String, Integer> e : tech.getEffects().entrySet())
                jgen.writeNumberField(e.getKey(), e.getValue().intValue());
            jgen.writeEndObject();

            jgen.writeArrayFieldStart("previous");
            for(Technology t : tech.getPrevious())
                jgen.writeString(t.getId());
            jgen.writeEndArray();

            jgen.writeArrayFieldStart("help");
            for(Technology t : tech.getHelp())
                jgen.writeString(t.getId());
            jgen.writeEndArray();
            
            jgen.writeEndObject();
        }
    }


    private final ObjectMapper mapper; 

    JsonWriter() {
        mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        
        SimpleModule module = new SimpleModule();
        module.addSerializer(Technology.class, new TechnologySerializer());
        mapper.registerModule(module);
    }

    private Map<String, Technology> parseGraph() throws IOException {
        try (Reader r = new InputStreamReader(Application.class.getResourceAsStream("/com/galvarez/technologies/technologies.plantuml"))) {
            return new PlantumlParser().parse(new BufferedReader(r));
        }
    }

    public static void main(String... args) throws Exception {
        String out = args[0];

        JsonWriter writer = new JsonWriter();
        Map<String, Technology> technologies = writer.parseGraph();

        log.info("Write to {}:\n{}", out, technologies);
        writer.mapper.writeValue(new File(out), technologies);
    }
}