export function extractSections (text) {
    const sections = [];
    let currentSection = null;

    const takeSection = () => {
        if (null !== currentSection) {
            currentSection.body = currentSection.body.trim();
            sections.push(currentSection);
            currentSection = null;
        }
    };

    text.split(/\n/).map(line => line.trim()).forEach(line => {
        const colonPos = line.indexOf(":");
        if (-1 !== colonPos) {
            takeSection();

            if (0 === colonPos) {
                sections.push({type: "reference", name: line.substr(1), title: "", body: ""});
            } else {
                const name = line.substr(0, colonPos).trim();
                const title = line.substr(colonPos + 1).trim();
                currentSection = {type: "definition", name, title, body: ""};
            }
        } else {
            if (null !== currentSection) {
                if ("" !== currentSection.body) {
                    currentSection.body += "\n";
                }
                currentSection.body += line;
            }
        }
    });

    takeSection();

    return sections;
}

export function parseSong (text) {
    const song = {};
    const sections = extractSections(text);

    const sectionsByName = {};

    sections.forEach(section => {
        if (section.name === 'Title' || section.name === 'Author') {
            song[section.name] = section.title;
        }
        if (section.type === "definition") {
            section.parsedBody = parseSectionBody(section.body);
            sectionsByName[section.name] = section;
        }
    });

    song.markerSizeHint = 200;

    song.sections = sections.map(section =>
        sectionsByName[section.name]
    );

    return song;
}

const parseLine = line => {

    let type = "text";
    const parts = line.split(/(?=\[[^\]]+\])/).map(part => {
        const match = /^\[([^\]]+)\]\s*(.*?)\s*$/.exec(part);
        if (match) {
            type = "tab";
            return {
                marker: match[1],
                body: match[2]
            };
        } else {
            return {
                marker: '',
                body: part.trim()
            };
        }
    });

    return {
        type,
        body: type === "text" ? line : parts
    };
};

export function parseSectionBody (text) {
    return text.split(/\n+/).map(parseLine);
};
