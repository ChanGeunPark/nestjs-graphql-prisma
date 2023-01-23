import { Inject, Injectable } from '@nestjs/common';

import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interface';
import got from 'got';

/**
   * mailgun에서 제공하는 api를 사용해서 이메일을 보내는 로직
 * curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
	-F from='Excited User <mailgun@YOUR_DOMAIN_NAME>' \
	-F to=YOU@YOUR_DOMAIN_NAME \
	-F to=bar@example.com \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomeness!'
  // F는 form-data를 의미한다.
 */

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    // to: string, //  유저의 이메일 주소 -> 직접 입력받기 때뮨에 나중에 수정
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    // 보내는 이메일 주소
    form.append('from', `Alvin from site <mailgun@${this.options.domain}>`);
    // 받는 이메일 주소
    form.append('to', `design795@naver.com`); // TODO : 유저의 이메일 주소로 수정
    // 제목
    form.append('subject', subject);
    // 템플릿
    form.append('text', template);

    form.append('template', 'verify_email');
    emailVars.forEach((emailVar) =>
      form.append(`v:${emailVar.key}`, emailVar.value),
    );

    /**
     * 이메일을 보내는 로직(mailgun)
     * got은 axios와 비슷한 라이브러리
     */
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          // mailgun에서 제공하는 api key를 base64로 인코딩해서 보내야한다.
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify_email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
