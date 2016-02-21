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