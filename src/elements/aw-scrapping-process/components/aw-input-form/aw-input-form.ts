import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { $scrappingContext, $socketContext } from "../../../../context";
import {
  ScrapperInputRequired,
  ScrappingProcessState,
} from "../../../../interfaces";
import { TWStyles } from "../../../../../tailwind/twlit";
import "../../../../components/index";
import img from "../../../../assets/estado.svg";
import { StoreController } from "@nanostores/lit";
import { getValidationSchema } from "../../../../utils/validations/input-text-validations";
import { ValidationError } from "yup";
@customElement("aw-input-form")
export class AwInputForm extends LitElement {
  static styles = [TWStyles];

  private _context = new StoreController(this, $scrappingContext);

  @property({ type: Boolean, attribute: false })
  @state()
  observeTime: boolean = true;

  @state()
  _validating = false;

  @state()
  _validationErrors: ValidationError[] = [];

  private async _submit(e: SubmitEvent) {
    e.preventDefault();
    this._validating = true;

    const inputs = this._context.value.dynamicInputs!;
    let obj = {};

    if (inputs.length > 0) {
      for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].segments) {
          obj = this._handleSegmentInput(
            inputs[index].name,
            obj,
            inputs[index].segments ?? 0
          );
        } else {
          obj = this._handleCompleteInput(inputs[index].name, obj);
        }
      }

      /* Validar Objeto */
      const validationSchema = getValidationSchema(inputs);
      try {
        validationSchema.validateSync(obj, {
          abortEarly: false,
        });
        this.observeTime = false;
        $socketContext.get().$socket?.emit("RECEIVE_REQUIRED_DATA", obj);
        $scrappingContext.set({
          state: ScrappingProcessState.Loading,
          dynamicInputs: [],
        });
      } catch (errors) {
        if (errors instanceof ValidationError)
          this._validationErrors = errors.inner;
      } finally {
        this._validating = false;
      }
    }
  }

  private _handleSegmentInput(id: string, obj: any, segments: number) {
    let value = "";
    for (let index = 0; index < segments; index++) {
      const input = this.shadowRoot?.querySelector(
        `#${id}${index + 1}`
      ) as HTMLInputElement;
      value = value + input.value;
    }
    return Object.assign(obj, {
      [id]: value,
    });
  }

  private _handleCompleteInput(id: string, obj: any) {
    const input = this.shadowRoot?.querySelector(`#${id}`) as HTMLInputElement;
    return Object.assign(obj, {
      [id]: input.value,
    });
  }

  private _getErrorList(name: string) {
    if (this._validationErrors.map((x) => x.path).includes(name)) {
      return this._validationErrors
        .filter((x) => x.path == name)
        .map((error: ValidationError) => {
          return html`<li>${error.message}</li>`;
        });
    }
    return "";
  }

  render() {
    return html` <form
      id="my-form"
      class=" h-[100%] flex flex-col justify-center"
      @submit=${this._submit}
    >
      <!-- Header -->
      <div class="mb-5 flex flex-col text-center">
        ${!this._context.value?.step?.title?.length
          ? html`<img
              src=${img}
              height="80"
              width="170"
              class="mb-4 mx-auto"
            />`
          : html`
              <span class="text-[#474747] font-bold text-lg"
                >${this._context.value?.step?.title}</span
              >
              <small class="text-gray-400 font-normal text-sm"
                >${this._context.value?.step?.subtitle}</small
              >
            `}
      </div>

      <!-- Fin header -->
      ${this._context.value.dynamicInputs?.map(
        (input: ScrapperInputRequired) => {
          return html`
            ${input.timeout && this.observeTime
              ? html`<aw-time-out timeout=${input.timeout}></aw-time-out>`
              : ""}
            ${input.segments
              ? html`
                  <div class="flex flex-row gap-0.5">
                    ${Array(input.segments)
                      .fill(1)
                      .map((_: number, index: number) => {
                        return html` <input
                          @input=${(_: Event) => {
                              const el = this.shadowRoot?.querySelector(
                                `#${input.name}${index + 2}`
                              );
                              if (el) {
                                (el as HTMLInputElement).focus();
                              }
                          }}
                          maxlength="1"
                          class="pl-4 placeholder:text-gray-400 placeholder:capitalize text-sm font-bold w-10  h-14 
                          bg-transparent rounded-md  outline-none border-[1px] border-[#909090]  mx-auto"
                          type=${input.type}
                          id=${`${input.name}${index + 1}`}
                        />`;
                      })}
                  </div>
                  <ul class="text-red-500 list-none mb-3.5 text-start">
                    ${this._getErrorList(input.name)}
                  </ul>
                `



              : html`
                  <input
                    class="pl-4 placeholder:text-gray-400 placeholder:capitalize text-sm font-normal w-full 
                     h-12 bg-transparent rounded-full  outline-none border-[2px] border-[#909090] "
                    placeholder=${input.label}
                    type=${input.type}
                    name=${input.name}
                    id=${input.name}
                    @input=${(_: Event) => {
                      this._validationErrors = this._validationErrors.filter(
                        (x) => x.path != input.name
                      );
                    }}
                  />
                  <ul class="text-red-500 list-none mb-3.5 text-start">
                    ${this._getErrorList(input.name)}
                  </ul>
                `}
          `;
        }
      )}

      <!--  -->
      ${!this._context.value?.step?.title?.length
        ? html`
            <div class="bg-gray-200 mx-5 py-1 px-0.5 rounded-md">
              <span class="text-[#474747] text-xs  break-words">
                Los datos son encriptados con TLS 1.2 y se utilizarán para pagar
                esta única vez.
              </span>
            </div>
          `
        : ""}

      <div class="flex flex-1"></div>
      <aw-continue-button
        class="w-full"
        type="submit"
        ?disabled=${this._validating}
        @button-continue-click=${(e: SubmitEvent) => {
          this._submit(e);
        }}
      ></aw-continue-button>
    </form>`;
  }
}
