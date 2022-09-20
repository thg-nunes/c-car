type EtherialMailProtocol = {
  sendMail(to: string, subject: string, path: string, variables: any): Promise<void>;
};

export { EtherialMailProtocol };
