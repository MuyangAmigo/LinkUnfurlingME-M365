import { default as axios } from "axios";
import * as querystring from "querystring";
import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
  MessagingExtensionAction,
  MessagingExtensionQuery,
  MessagingExtensionResponse,
  MessagingExtensionActionResponse,
  AppBasedLinkQuery,
} from "botbuilder";

export class TeamsBot extends TeamsActivityHandler {

  // Link Unfurling.
  public async handleTeamsAppBasedLinkQuery(
    context: TurnContext,
    query: AppBasedLinkQuery
  ): Promise<MessagingExtensionResponse> {
    const attachment = CardFactory.thumbnailCard("Image Preview Card", query.url, [query.url]);

    // By default the link unfurling result is cached in Teams for 30 minutes.
    // The code has set a cache policy and removed the cache for the app. Learn more here: https://learn.microsoft.com/microsoftteams/platform/messaging-extensions/how-to/link-unfurling?tabs=dotnet%2Cadvantages#remove-link-unfurling-cache
    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [attachment],
        suggestedActions: {
          actions: [
            {
              title: "default",
              type: "setCachePolicy",
              value: '{"type":"no-cache"}',
            },
          ],
        },
      },
    };
  }
}
