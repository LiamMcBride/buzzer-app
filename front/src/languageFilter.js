const {
	RegExpMatcher,
	TextCensor,
	englishDataset,
	englishRecommendedTransformers,
} = require('obscenity');

export function isObscene(text){
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });
  
  if (matcher.hasMatch(text)) {
    return true
  }
  return false
  // The input text contains profanities.
}

