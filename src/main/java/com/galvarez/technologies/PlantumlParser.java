package com.galvarez.technologies;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

final class PlantumlParser {

    private static final Logger log = LoggerFactory.getLogger(PlantumlParser.class);

    private final Map<String, Technology> technologies = new LinkedHashMap<>();

    private Technology current = null;

    PlantumlParser() {
    }

    Map<String, Technology> parse(BufferedReader reader) throws IOException {
        for (String line = reader.readLine(); line != null; line = reader.readLine()) {
            line = line.trim();
            if (current == null) {
                if (parseNodeStart(line)) {
                    log.info("Start {}", current.getId());
                } else {
                    parseLink(line);
                }
            } else {
                if (current.getName() == null)
                    parseNodeName(line);
                if (current.getEffects().isEmpty())
                    parseNodeEffects(line);
                else
                    parseNodeContent(line);
            }
        }
        return technologies;
    }

    private static final Pattern NODE_START = Pattern.compile("node\\s+(\\w+)\\s+\\[");

    private boolean parseNodeStart(String line) {
        Matcher matcher = NODE_START.matcher(line);
        if (matcher.matches()) {
            current = new Technology(matcher.group(1));
            return true;
        }
        return false;
    }

    private static final Pattern NODE_NAME = Pattern.compile("<b>\\s*(\\w+)\\s*");

    private boolean parseNodeName(String line) {
        Matcher matcher = NODE_NAME.matcher(line);
        if (matcher.matches()) {
            current.setName(matcher.group(1));
            return true;
        }
        return false;
    }

    private static final Pattern NODE_EFFECTS = Pattern.compile("\\s*([+]\\d+)\\s+(\\w+)\\s*");

    private boolean parseNodeEffects(String line) {
        Matcher matcher = NODE_EFFECTS.matcher(line);
        while (matcher.find()) {
            current.addEffect(matcher.group(2), Integer.parseInt(matcher.group(1)));
        }
        return !current.getEffects().isEmpty();
    }

    private static final Pattern NODE_END = Pattern.compile("\\]");

    private void parseNodeContent(String line) {
        Matcher matcher = NODE_END.matcher(line);
        if (matcher.matches()) {
            technologies.put(current.getId(), current);
            log.info("End {}", current);
            current = null;
        } else if (!line.contains("---")) {
            current.appendText(line.trim());
        }
    }

    private static final Pattern LINK = Pattern.compile("(\\w+)\\s+([\\.-]+>)\\s+(\\w+)");

    private boolean parseLink(String line) {
        Matcher matcher = LINK.matcher(line);
        if (matcher.matches()) {
            Technology source = technologies.get(matcher.group(1));
            Technology target = technologies.get(matcher.group(3));
            if (matcher.group(2).contains("-->"))
                target.addPrevious(source);
            else
                target.addHelp(source);
            return true;
        }
        return false;
    }

}
