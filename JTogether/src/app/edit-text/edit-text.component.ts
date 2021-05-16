import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent {
  @Input() placeholder: string | undefined;
  @Input() icon: string | undefined;
  @Input() hint: string | undefined;
  @Input() id: string | undefined;
  @Input() type = 'text';
  @Input() name: string | undefined;
}
