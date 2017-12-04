const cache = {};

const createParser = template => {
	const sanitized = template
		.replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, (_, match) => `\$\{map.${match.trim()}\}`)
		.replace(/(\$\{(?!map\.)[^}]+\})/g, '');

	return Function('map', `return \`${sanitized}\``);
};

const parseTemplate = (template, map) => {
	const parser = cache[template] = cache[template] || createParser(template);
	return map ? parser(map) : parser;
};

module.exports = parseTemplate;