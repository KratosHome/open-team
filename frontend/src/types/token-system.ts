interface TokenSystemStep {
  title: string;
  description: string;
  linkLabel?: string;
}

export interface TokenSystemDictionary {
  title: string;
  subtitle: string;
  step1: TokenSystemStep;
  step2: TokenSystemStep;
  step3: TokenSystemStep;
}
